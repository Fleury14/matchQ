import { Application } from "express";
import { testEndpoint } from "./test-endpoint";

export function initAPI (app:Application) {
    app.route('/api/test').get(testEndpoint);
}