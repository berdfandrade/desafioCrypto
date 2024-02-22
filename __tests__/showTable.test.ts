import MainController from "../src/controllers/mainController";
import { Request, Response } from "express"; 
import pool from "../dbConfig/poolConfig"; 


jest.mock("../dbConfig/poolConfig", () => ({
  __esModule: true,
  default: {
    connect: jest.fn(),
  },
}));

describe("MainController", () => {
  describe("showMainTable", () => {
    it("should send table structure as JSON response", async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockQueryResult = {
        rows: [
          {
            column_name: "id",
            data_type: "integer",
            character_maximum_length: null,
          },
          {
            column_name: "name",
            data_type: "character varying",
            character_maximum_length: 255,
          },
        ],
      };

      const mockQuery = jest.fn().mockResolvedValue(mockQueryResult);
      const mockClient = {
        query: mockQuery,
        release: jest.fn(),
      };
      (pool.connect as jest.Mock).mockResolvedValueOnce(mockClient);

      await MainController.showMainTable(req, res);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith(mockQueryResult.rows);

      expect(mockClient.release).toHaveBeenCalled();
    });

    it("should handle errors properly", async () => {
      const req = {} as Request;
      const res = {} as Response;

      (pool.connect as jest.Mock).mockRejectedValueOnce(
        new Error("Database error")
      );

      await expect(MainController.showMainTable(req, res)).rejects.toThrow(
        "Database error"
      );
    });
  });
});
