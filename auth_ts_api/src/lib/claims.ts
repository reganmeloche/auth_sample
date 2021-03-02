import passport from 'passport';

export default function (app: any) {
    const claimsCheck = (scope: any, req: any, res: any, next: any) => {
        passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
            if (err) { 
                return res.status(400).send(err); 
            }
            if (user) {
                req.user = user;
                req.userId = user.userId;
            }
            if ((user && user.claims.includes(scope))) {
            //if ((user && user.claims.includes(scope)) || scope === 'regular') {
                next();
            } else {
                return res.status(400).send({message: 'Unauthorized'});
            }
        })(req, res, next)
    }

    const buildClaim = (scope: any) => {
        return (req: any, res: any, next: any) => {
            return claimsCheck(scope, req, res, next)
        }
    }

    if (process.env.NODE_ENV !== 'test') {
        // Regular scope
        const regularGets = ['fetch_user', 'task', 'task/*'];
        const regularPosts = ['task', 'task/*'];
        const regularPuts = ['task/*'];
        const regularScope = buildClaim('regular');
        regularGets.forEach(x => app.get(`/api/${x}`, regularScope, (req: any, res: any, next: any) => { next(); }));
        regularPosts.forEach(x => app.post(`/api/${x}`, regularScope, (req: any, res: any, next: any) => { next(); }));
        regularPuts.forEach(x => app.put(`/api/${x}`, regularScope, (req: any, res: any, next: any) => { next(); }));

        // Admin scope
        const adminScope = buildClaim('admin');
        app.post('/api/admin', adminScope, (req: any, res: any, next: any) => { next(); });
        app.get('/api/user', adminScope, (req: any, res: any, next: any) => { next(); });
    }
}