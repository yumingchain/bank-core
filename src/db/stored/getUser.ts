import { sqlx } from "slonix";
import { storedFunction } from "@/db/helpers/storedFunction";
import { sql } from "slonik";
import { UserDb, UserDbId } from "../models/UserDb";

const UserT = UserDb.table;
const UserP = UserDb.props;

const name = sql.identifier(["getUser"]);

export const createSql = storedFunction({
    name: name,
    language: "sql",
    params: ["userId integer"],
    returns: sqlx`SETOF ${UserT}`,
})`
    SELECT * FROM ${UserT} WHERE ${UserP.id} = userId;
`;

export const getUser = (userId: UserDbId) => {
    return sqlx`SELECT * FROM ${name}(userId => ${userId})`;
};
