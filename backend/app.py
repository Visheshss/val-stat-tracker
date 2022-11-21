from distutils.log import debug
from logging import exception

from flask import Flask, app, jsonify, request, json, make_response, session

import valo_api
from valo_api.exceptions.valo_api_exception import ValoAPIException


app = Flask(__name__)
app.secret_key = 'key'


@app.route('/player/<name>/<tag>', methods=['POST', 'GET'])
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
        lvl, region, puuid = acc_info.account_level, acc_info.region, acc_info.puuid

        if acc_info.card:
            card = acc_info.card.small
        else:
            card = 'https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/smallart.png'

        account_data['status'] = 200
        account_data['card'], account_data['lvl'] = card, lvl

        # Get current mmr information: current rank tier, elo, and ranking within tier
        mmr = valo_api.get_mmr_details_by_puuid_v2(region=region, puuid=puuid)
        comp_rank, elo, tier_rank, tier_png = mmr.current_data.currenttierpatched, mmr.current_data.elo, mmr.current_data.ranking_in_tier, mmr.current_data.currenttier
        account_data['curRank'], account_data['elo'], account_data['tierRank'], account_data['tierPNG'] = comp_rank, elo, tier_rank, tier_png

        # Get last 20 matches
        point_type = valo_api.endpoints.raw.EndpointType.MATCH_HISTORY
        matches = valo_api.get_raw_data_v1(
            type=point_type, value=puuid, region=region, queries={'startIndex': 0, 'endIndex': 20})
        account_data['matches'] = {}
        account_data['overallStats'] = {'score': [0, 0], 'kills': 0, 'deaths': 0,
                                        'assists': 0, 'headshots': 0, 'bodyshots': 0, 'legshots': 0}

        # Check each individual match and pull relevant information (match type, player stats, score, map,)
        # Store the information in a hash map account_info
        for match in matches.History:
            iD, match_type = match.MatchID, match.QueueID
            match_details = valo_api.get_match_details_v2(match_id=iD)
            map_name = match_details.metadata.map
            team_color, player_details = None, None

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

            # If the player does not exist on either team, skip this match
            if not player_details:
                continue

            # Store player info from the match in a hashmap
            stats, assets, char = player_details.stats, player_details.assets, player_details.character

            # Find the player's placement to determine if they won or lost
            '''ranking = 1
            acs = stats.score
            for player in match_details.players.all_players:
                if acs < player.stats.score:
                    ranking += 1

            # If it's a deathmatch, use the ranking to determine if the player won
            if match_type == 'deathmatch':
                if ranking == 1:
                    has_won = True
                else:
                    has_won = False'''

            # If it is a team game, find the score and if the team won
            team_details = match_details.teams
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

            # Add to total stats
            account_data['overallStats']['score'][0] += stats.score
            account_data['overallStats']['score'][1] += 1

            account_data['overallStats']['kills'] += stats.kills
            account_data['overallStats']['deaths'] += stats.deaths
            account_data['overallStats']['assists'] += stats.assists
            account_data['overallStats']['headshots'] += stats.headshots
            account_data['overallStats']['bodyshots'] += stats.bodyshots
            account_data['overallStats']['legshots'] += stats.legshots

            # Turn classes into hashmaps
            stats = {'kills': stats.kills, 'deaths': stats.deaths, 'assists':
                     stats.assists, 'score': stats.score, 'headshots': stats.headshots,
                     'bodyshots': stats.bodyshots, 'legshots': stats.legshots}

            player_match_info = {
                'hasWon': has_won, 'stats': stats, 'agentPNG': assets.agent.small,
                'map': map_name, 'agentName': char}

            if match_type != 'deathmatch':
                player_match_info['score'] = score

            # Add the game hashmap as a match under its type in account_data
            if match_type in account_data['matches']:
                account_data['matches'][match_type][iD] = player_match_info

            else:
                account_data['matches'][match_type] = {
                    iD: player_match_info}

        return account_data

    # Return type of error to frontend
    except ValoAPIException as error:
        return {'status': error.status}

    except:
        return {'status': 'unknown'}


if __name__ == '__main__':
    app.run(debug=True)

# N4RRATE#JESUS
