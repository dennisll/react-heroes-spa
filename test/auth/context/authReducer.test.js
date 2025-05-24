import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe("test authReducer", () => {
  test("debe de retornar el estado por defecto", () => {
    const state = {};

    const auth = authReducer(state, {});

    expect(auth).toEqual(state);
  });

  test("debe de establecer el usuario logueado", () => {
    const action = {
      type: types.login,
      payload: { id: "1213", name: "Juan Carlos" },
    };
    const state = { logued: false };

    const auth = authReducer(state, action);

    expect(auth).toEqual({
        ...state,
        logged: true,
        user: action.payload
    });
  });

  test("debe de mostrar el logued en false", () => {
    const action = {
      type: types.logout,
    };

    const state = { loggued: true, user: { id: "1213", name: "Juan Carlos"} };

    const auth = authReducer(state, action);

    expect(auth).toEqual({ logged: false });
  });
});
