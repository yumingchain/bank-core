import { seedTestData } from "./seedTestData";
import { seedInitData } from "./seedInitData";
import { pool } from ".";
import { sqlx } from "slonix";
import { modelCreateSqls } from "./models";
import { storedCreateSqls } from "./stored";

// TODO [RM]: Recreated fresh SQL database with fresh data on each call;
// TODO [RM]: for DEV purposes only. For production needed different behavior.

export const initDb = async () => {
    require("./registerSqlxProcessor");

    await pool.transaction(async t => {
        for (const modelCreateSql of modelCreateSqls) {
            await sqlx.query(t, modelCreateSql);
        }

        for (const storedCreateSql of storedCreateSqls) {
            await sqlx.query(t, storedCreateSql);
        }
    });

    const initData = await seedInitData();
    await seedTestData(initData);
};
