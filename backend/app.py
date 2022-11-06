from distutils.log import debug
from logging import exception
from tkinter import E

from flask import Flask, app, jsonify, request, json, make_response, session

import valo_api
from valo_api.exceptions.valo_api_exception import ValoAPIException


app = Flask(__name__)
app.secret_key = 'key'


@app.route('/player/<name>/<tag>', methods=['GET'])
def player(name, tag):
    # If username has spaces in it, replace them with '%20' so that the API understands
    name = name.split(' ')
    if len(name) > 1:
        convert_name = str(name[0])
        for n in name[1:]:
            convert_name += '%20' + str(n)
        name = convert_name
    else:
        name = name[0]

    # Make API requests using the username and return it to the frontend

    account_data = {}

    try:
        # Player card and account level
        acc_info = valo_api.get_account_details_by_name_v1(name, tag)
        card, lvl, p_region, puuid = acc_info.card.small, acc_info.account_level, acc_info.region, acc_info.puuid
        account_data['status'] = 200
        account_data['card'], account_data['lvl'] = card, lvl

        # Get last 20 matches
        point_type = valo_api.endpoints.raw.EndpointType.MATCH_HISTORY
        matches = valo_api.get_raw_data_v1(
            type=point_type, value=puuid, region=p_region, queries={'startIndex': 0, 'endIndex': 20})
        account_data['matches'] = {}
        account_data['overallStats'] = {'score': 0, 'kills': 0, 'deaths': 0,
                                        'assists': 0, 'headshots': 0, 'bodyshots': 0, 'legshots': 0}

        # Check each individual match and pull relevant information (match type, player stats, score, map,)
        # Store the information in a hash map account_info
        for match in matches.History:
            iD, match_type = match.MatchID, match.QueueID
            match_details = valo_api.get_match_details_v2(match_id=iD)
            map_name = match_details.metadata.map
            team_color = None

            # Find player and team color
            for player in match_details.players.red:
                if player.puuid == puuid:
                    player_details = player
                    team_color = 'red'
                    break

            if not team_color:
                for player in match_details.players.blue:
                    if player.puuid == puuid:
                        player_details = player
                        team_color = 'blue'
                        break

            # Store player info from the match in a hashmap
            stats, assets, char = player_details.stats, player_details.assets, player_details.character

            # Find score and determine if the player's team won or lost
            team_details = match_details.teams

            # Find the player's placement to determine if they won or lost
            ranking = 1
            acs = stats.score
            for player in match_details.players.all_players:
                if acs < player.stats.score:
                    ranking += 1

            # If it's a deathmatch, use the ranking to determine if the player won
            if match_type == 'deathmatch':
                if ranking == 1:
                    has_won = True
                else:
                    has_won = False

            # If it is a team game, find the score and if the team won
            else:
                score = False, ''
                if team_color == 'red':
                    won = team_details.red.rounds_won
                    lost = team_details.red.rounds_lost
                    has_won = team_details.red.has_won
                    score = str(won) + ' - ' + str(lost)
                else:
                    won = team_details.blue.rounds_won
                    lost = team_details.blue.rounds_lost
                    has_won = team_details.blue.has_won
                    score = str(won) + ' - ' + str(lost)

            # Turn classes into hashmaps
            stats = json.dumps(stats.__dict__)
            assets = {'card': assets.card.small, 'agent': assets.agent.bust}
            player_match_info = {
                'hasWon': has_won, 'stats': stats, 'assets': assets,
                'map': map_name, 'character': char, 'rank': ranking}
            if match_type != 'deathmatch':
                player_match_info['score'] = score

            # Add the game hashmap as a match under its type in account_data
            if match_type in account_data['matches']:
                account_data['matches'][match_type][iD] = player_match_info

            else:
                account_data['matches'][match_type] = {iD: player_match_info}

        return account_data

    # Return type of error to frontend
    except ValoAPIException as error:
        return {'status': error.status}


if __name__ == '__main__':
    app.run(debug=True)
