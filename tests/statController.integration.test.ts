// tests/statController.integration.test.ts
import express from "express";
import request from "supertest";
import { statController } from "../src/controllers/statController";

global.fetch = jest.fn();

describe("statController (integration)", () => {
    const app = express();
    app.get("/stats", statController);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200 and standings text", async () => {
        const mockPlayerHTML = `
      <table><tr><a>Joe Burrow</a></tr><tr><span>CIN</span></tr></table>
    `;
        const mockStandingsHTML = `
      <table><tr><td>Header</td></tr><tr><td>AFC North Standings</td></tr></table>
    `;

        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({ text: jest.fn().mockResolvedValue(mockPlayerHTML) })
            .mockResolvedValueOnce({ text: jest.fn().mockResolvedValue(mockStandingsHTML) });

        const res = await request(app).get("/stats");

        expect(res.status).toBe(200);
        expect(res.text).toContain("AFC North Standings");
    });
});
