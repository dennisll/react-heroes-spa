import { expect, describe, test} from "@jest/globals";
import { types } from "../../../src/auth/types/types";

describe('test en types', () => {
  test('debe de regresar estos types', () => {
    expect(types).toEqual({
        login: '[Auth] Login',
        logout: '[Auth] Logout'
    });
  });
  
});
