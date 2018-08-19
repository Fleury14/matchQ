import { Application } from "express";
import { testEndpoint } from "./test-endpoint";
import { testBodyEndpoint } from "./test-body-endpoint";
import { addTournament } from "./endpoints/tournaments/addTournament";
import { deleteTournament } from "./endpoints/tournaments/deleteTournament";
import { listTournaments } from "./endpoints/tournaments/listTournaments";
import { getMyTournament } from "./endpoints/tournaments/getMyTournament";
import { searchTournament } from "./endpoints/tournaments/searchTournament";

import { addSubscription } from "./endpoints/subscriptions/addSubscription";
import { removeSubscription } from "./endpoints/subscriptions/removeSubscription";
import { getTournamentsBySub } from "./endpoints/subscriptions/getTournamentsBySub";
import { decodeToken } from "./endpoints/auth/decodeToken";

import { addUser } from "./endpoints/user/addUser";
import { checkUserUid } from "./endpoints/user/checkUserUid";
import { searchUser } from "./endpoints/user/searchUser";

import { getTournamentByName } from "./endpoints/tournaments/getTournByName";
import { toggleActive } from "./endpoints/queue/toggleActive";

import { addInvite } from "./endpoints/invites/addInvite";
import { acceptInvite } from "./endpoints/invites/acceptInvite";
import { removeInvite } from "./endpoints/invites/removeInvite";
import { removeAccess } from "./endpoints/queue/removeAccess";
import { addMatch } from "./endpoints/matches/addMatch";

export function initAPI (app:Application) {
    app.route('/api/test').get(testEndpoint);
    app.route('/api/body-test').post(testBodyEndpoint);

    app.route('/api/tournament/add').post(addTournament);
    app.route('/api/tournament/delete').post(deleteTournament);
    app.route('/api/tournament/list').get(listTournaments);
    app.route('/api/tournament/get-mine').post(getMyTournament);
    app.route('/api/tournament/search').post(searchTournament);
    app.route('/api/tournament/get-name').post(getTournamentByName);

    app.route('/api/subscription/add').post(addSubscription);
    app.route('/api/subscription/remove').post(removeSubscription);
    app.route('/api/subscription/tourn').post(getTournamentsBySub);

    app.route('/api/auth/token-check').post(decodeToken);

    app.route('/api/user/add').post(addUser);
    app.route('/api/user/check').post(checkUserUid);
    app.route('/api/user/search').post(searchUser);

    app.route('/api/queue/toggle').post(toggleActive);
    app.route('/api/queue/remove-access').post(removeAccess);

    app.route('/api/invite/add').post(addInvite);
    app.route('/api/invite/accept').post(acceptInvite);
    app.route('/api/invite/remove').post(removeInvite);

    app.route('/apit/match/add').post(addMatch);
}