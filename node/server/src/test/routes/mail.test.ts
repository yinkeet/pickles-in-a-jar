import request from 'supertest';
import { app, server } from './../../index';
import { saveEmail } from './../../services/db';
import { queueEmail } from './../../services/queue';
import { Email } from '../../schema/email';

jest.mock('./../../services/db', () => ({
    saveEmail: jest.fn().mockReturnValue('d94c2eaf-fc21-4e2b-b63c-a8173502238d'),
}));

jest.mock('./../../services/queue', () => ({
    queueEmail: jest.fn(),
}));

describe('Post Mail Endpoint', () => {
    afterAll(async () => {
        server.close();
        jest.clearAllMocks();
    });
    it('should return 204', async () => {
        const email: Email = {
            'from': 'abc@gmail.com',
            'to': ['123@gmail.com'],
            'subject': 'Some subject',
            'text': 'Important text'
        }

        const response = await request(app).post('/api/v1/email').send(email);

        expect(response.status).toBe(204);
        expect(response.text).toBe('');
        expect(saveEmail).toBeCalledTimes(1);
        expect(saveEmail).toBeCalledWith(email);
        expect(queueEmail).toBeCalledTimes(1);
        expect(queueEmail).toBeCalledWith('d94c2eaf-fc21-4e2b-b63c-a8173502238d', email);
    });
});
