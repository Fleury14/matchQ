import { Application } from "express";
import { testEndpoint } from "./test-endpoint";
import { testBodyEndpoint } from "./test-body-endpoint";
import { addTournament } from "./endpoints/tournaments/addTournament";
import { deleteTournament } from "./endpoints/tournaments/deleteTournament";
import { listTournaments } from "./endpoints/tournaments/listTournaments";

export function initAPI (app:Application) {
    app.route('/api/test').get(testEndpoint);
    app.route('/api/body-test').post(testBodyEndpoint);

    app.route('/api/tournament/add').post(addTournament);
    app.route('/api/tournament/delete').delete(deleteTournament);
    app.route('/api/tournament/list').get(listTournaments);
}