import * as Hapi from "hapi";

import UserController from "./user.controller";
import * as UserValidator from "./user.validator";
import {IDatabase} from "../../database";
import {IServerConfigurations} from "../../configs";

export default function (server: Hapi.Server, serverConfigs: IServerConfigurations, database: IDatabase) {
    const userController = new UserController(serverConfigs, database);
    server.bind(userController);

    server.route({
        method: "GET",
        path: "/api/users-info",
        options: {
            handler: userController.infoUser,
            auth: "jwt",
            tags: ["api", "users"],
            description: "Get user info.",
            validate: {
                headers: UserValidator.jwtValidator
            }
        }
    });

    server.route({
        method: "DELETE",
        path: "/api/users",
        options: {
            handler: userController.deleteUser,
            auth: "jwt",
            tags: ["api", "users"],
            description: "Delete current user.",
            validate: {
                headers: UserValidator.jwtValidator
            }
        }
    });

    server.route({
        method: "POST",
        path: '/auth/token',
        options: {
            handler: userController.handleGenerateNewToken,
            auth: false,
            tags: ["api", "users"],
            description: "Generate new token",
        }
    })

    server.route({
        method: "PUT",
        path: "/api/users",
        options: {
            handler: userController.updateUser,
            auth: "jwt",
            tags: ["api", "users"],
            description: "Update current user info.",
            validate: {
                payload: UserValidator.updateUserModel,
                headers: UserValidator.jwtValidator
            }
        }
    });

    server.route({
        method: "POST",
        path: "/auth/register",
        options: {
            handler: userController.createUser,
            auth: false,
            tags: ["api", "users"],
            description: "Create a user.",
            validate: {
                payload: UserValidator.createUserModel
            }
        }
    });

    server.route({
        method: "POST",
        path: "/auth/login",
        options: {
            handler: userController.loginUser,
            auth: false,
            tags: ["api", "users"],
            description: "Login a user.",
            validate: {
                payload: UserValidator.loginUserModel
            }
        }
    });

    server.route({
        method: "GET",
        path: "/auth/logout",
        options: {
            handler: userController.logoutUser,
            auth: "jwt",
            tags: ["api", "users"],
            description: "Logout a user.",
            validate: {}
        }
    })

}
