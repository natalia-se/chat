import { getMessages } from "./controllers/message-controller";
import { Request, Response } from "express";

const expectedMessages = [
  {
    _id: "635ecfbbf2e9fcfdaab69891",
    text: "Hi",
    author: "Nat4",
    createdAt: "2022-10-30T19:25:47.296Z",
    updatedAt: "2022-10-30T19:25:47.296Z",
  },
  {
    _id: "635ed0b5434cc6bb2a979894",
    text: "How are you?",
    author: "Nat4",
    createdAt: "2022-10-30T19:29:57.976Z",
    updatedAt: "2022-10-30T19:29:57.976Z",
  },
];

jest.mock("./services/chat-service", () => {
  const originalModule = jest.requireActual("./services/chat-service");

  return {
    __esModule: true,
    originalModule,
    loadMessages: () => Promise.resolve(expectedMessages),
  };
});

describe("get all messages", () => {
  test("should return all messages", async () => {
    let responseObject = {};
    const request = {};
    const response: Partial<Response> = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      send: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };

    await getMessages(request as Request, response as Response);
    expect(responseObject).toEqual(expectedMessages);
  });
});
