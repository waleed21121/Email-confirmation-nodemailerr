import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { randomBytes } from 'crypto';
import { Register } from './confirmEmailDto';
import { UserInfo } from './userInfo';
import { sendEmail } from './mailer';
import { Token } from './tokenDto';

const app = express();

app.use(express.static('../public'));

app.use(bodyParser.urlencoded({extended: true}));

const users_DB: UserInfo[] = [];


app.get('/', function (req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '../public/form.html'))
})

app.post('/submit-form', async (req: Request<{}, {}, Register>, res: Response, next: NextFunction) => {

    const { email } = req.body;

    const token = randomBytes(16).toString('hex');
    const user: UserInfo = { email, token };
    users_DB.push(user);

    try {

        sendEmail(email, token);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to send email');
    }
})


app.get('/confirm-email', (req: Request<{}, {}, {}, Token>, res: Response) => {
    const { token } = req.query;


    const user = users_DB.find((user) => user.token === token);
    if (user) {
        res.status(200).json({ message: `Email confirmed for ${user.email}` });
    } else {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});

app.listen(3000, () => {  
    console.log('Server started on port 3000');
})