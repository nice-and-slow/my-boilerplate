const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const APP_SECRET = 'super_secret123';

function retrievUserIdFromToken(ctx) {
    const authToken = ctx.request.get('Authorization');

    if (authToken) {
        const token = authToken.replace('Bearer ', '');
        const { userId } = jwt.verify(token, APP_SECRET);
        return userId;
    }

    throw new Error('Authentication failure');
}

const resolvers = {
    Query: {
        fetchAllContracts: (parent, args, ctx, info) => {
            return ctx.prisma.query.contracts({}, info);
        },
        fetchContracts: (parent, args, ctx, info) => {
            const userId = retrievUserIdFromToken(ctx);
            console.log(`userId ${userId}`);
            return ctx.prisma.query.contracts(
                {
                    where: {
                        owner: {
                            id: userId,
                        },
                    },
                },
                info,
            );
        },
        fetchUser: (parent, args, ctx, info) => {
            const userId = retrievUserIdFromToken(ctx);
            console.log(`userId ${userId}`);
            return ctx.prisma.query.user({ where: { id: userId } }, info);
        },
    },
    Mutation: {
        createContract: (parent, args, ctx, info) => {
            const { title, description } = args;
            const userId = retrievUserIdFromToken(ctx);

            return ctx.prisma.mutation.createContract(
                {
                    data: {
                        title,
                        description,
                        owner: {
                            connect: { id: userId },
                        },
                    },
                },
                info,
            );
        },

        signupUser: async (parent, args, ctx, info) => {
            const { name, email } = args;
            const password = await bcrypt.hash(args.password, 10);
            const user = await ctx.prisma.mutation.createUser(
                {
                    data: { name, email, password },
                },
                info,
            );
            return user;
        },

        loginUser: async (parent, args, ctx, info) => {
            const user = await ctx.prisma.query.user({
                where: { email: args.email },
            });

            if (!user) {
                throw new Error('유저 정보가 없습니다.');
            }

            const valid = await bcrypt.compare(args.password, user.password);
            if (!valid) {
                throw new Error('비밀번호가 맞지 않습니다.');
            }

            const token = jwt.sign({ userId: user.id }, APP_SECRET);

            return {
                token,
                user,
            };
        },
    },
};

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        prisma: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://us1.prisma.sh/skparci/server/my-boilerplate',
            debug: true,
        }),
    }),
});

server.start(() => console.log(`Server is running`));
