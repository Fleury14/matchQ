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

export function initAPI (app:Application) {
    app.route('/api/test').get(testEndpoint);
    app.route('/api/body-test').post(testBodyEndpoint);

    app.route('/api/tournament/add').post(addTournament);
    app.route('/api/tournament/delete').post(deleteTournament);
    app.route('/api/tournament/list').get(listTournaments);
    app.route('/api/tournament/get-mine').post(getMyTournament);
    app.route('/api/tournament/search').post(searchTournament);

    app.route('/api/subscription/add').post(addSubscription);
    app.route('/api/subscription/remove').post(removeSubscription);
    app.route('/api/subscription/tourn').post(getTournamentsBySub);

    app.route('/api/auth/token-check').post(decodeToken);

    app.route('/api/user/add').post(addUser);
    app.route('/api/user/check').post(checkUserUid);
}