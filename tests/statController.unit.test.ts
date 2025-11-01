// tests/statController.unit.test.ts

import { describe, it, expect, jest } from "@jest/globals";

// tests/statController.unit.test.ts
import { statController } from '../src/controllers/statController.ts';
import { Request, Response } from "express";
import jsdom from "jsdom";

// Create a typed mock for fetch
type FetchMock = jest.Mock<Promise<{ text: () => Promise<string> }>>;
global.fetch = jest.fn() as unknown as FetchMock;

describe("statController (unit)", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
        jest.clearAllMocks();

        mockReq = {};

        // Properly type mockRes to satisfy Express typings
        mockRes = {
            status: jest.fn().mockReturnThis() as any,
            send: jest.fn() as any,
        };
    });

    it("should parse player and team data and send response", async () => {
        const mockPlayerHTML = `
      <table>
        <tr><a>Patrick Mahomes</a></tr>
        <tr><span>KC</span></tr>
      </table>
    `;

        const mockStandingsHTML = `
      <table>
        <tr><td>Header</td></tr>
        <tr><td>Some Standings Info</td></tr>
      </table>
    `;

        (global.fetch as FetchMock)
            .mockResolvedValueOnce({ text: async () => mockPlayerHTML })
            .mockResolvedValueOnce({ text: async () => mockStandingsHTML });

        const jsdomSpy = jest.spyOn(jsdom, "JSDOM");

        await statController(mockReq as Request, mockRes as Response);

        expect(jsdomSpy).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith(expect.stringContaining("Some Standings Info"));
    });

    it("should log and not crash on error", async () => {
        (global.fetch as FetchMock).mockRejectedValueOnce(new Error("network error"));
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        await statController(mockReq as Request, mockRes as Response);

        expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });
});
