import { Application } from "express";
import { testEndpoint } from "./test-endpoint";
import { testBodyEndpoint } from "./test-body-endpoint";
import { addTournament } from "./endpoints/tournaments/addTournament";
import { deleteTournament } from "./endpoints/tournaments/deleteTournament";

export function initAPI (app:Application) {
    app.route('/api/test').get(testEndpoint);
    app.route('/api/body-test').post(testBodyEndpoint);

    app.route('/api/tournament/add').post(addTournament);
    app.route('/api/tournament/delete').delete(deleteTournament);
}