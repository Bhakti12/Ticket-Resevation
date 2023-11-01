import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { config } from "./env";
import { AllError } from "../Error/ErrorCases";
const userSchema = require("../Model/userSchema");
import { getAccountUser } from "../Type/User";

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.ACCESS_TOKEN_KEY,
};

passport.use(
    new JwtStrategy(options, async (payload: any, done) => {
        // Gets the user
        // const user = await client.accountUser.findFirst({
        //     where: {
        //         id: BigInt((<UserToken>payload).id),
        //     },
        // });

        console.log("userId",payload.data.userId);

        const user = await userSchema.findOne({
            _id : payload.data.userId
        });

        console.log("user passport",user);

        // If the user is not present
        if (!user) {
            throw new AllError('User not found','Not Implemented');
        }

        // If the user is Inactive
        if (user.status === 'Inactive') {
            throw new AllError('User is not active','Not Implemented');
        }

        return done(null, payload);
    }),
);

export default passport;