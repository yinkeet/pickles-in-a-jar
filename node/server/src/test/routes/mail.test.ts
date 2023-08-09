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

describe('Post Mail Endpoint Tests', () => {
    // Nesting describes inside of describe make sures that we run the silent failure tests in parallel first, then we run the success test
    // This eliminates some mocks not being cleared in time issue
    describe('Silent Failures', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        afterAll(async () => {
            server.close();
        });
        test.each([
            // from field issues
            [{
                'to': ['123@gmail.com'],
                'subject': 'Some subject',
                'text': 'Important text'
            }],
            [{
                'from': 'abc',
                'to': ['123@gmail.com'],
                'subject': 'Some subject',
                'text': 'Important text'
            }],
            [{
                'from': 123,
                'to': ['123@gmail.com'],
                'subject': 'Some subject',
                'text': 'Important text'
            }],
            // to field issues
            [{
                'from': 'abc@gmail.com',
                'subject': 'Some subject',
                'text': 'Important text'
            }],
            [{
                'from': 'abc@gmail.com',
                'to': [],
                'subject': 'Some subject',
                'text': 'Important text'
            }],
            [{
                'from': 'abc@gmail.com',
                'to': ['1'],
                'subject': 'Some subject',
                'text': 'Important text'
            }],
            [{
                'from': 'abc@gmail.com',
                'to': [1],
                'subject': 'Some subject',
                'text': 'Important text'
            }],
            // subject field issues
            [{
                'from': 'abc@gmail.com',
                'to': ['123@gmail.com'],
                'text': 'Important text'
            }],
            [{
                'from': 'abc',
                'to': ['123@gmail.com'],
                'subject': 123,
                'text': 'Important text'
            }],
            // text field issues
            [{
                'from': 'abc@gmail.com',
                'to': ['123@gmail.com'],
                'subject': 'Some subject'
            }],
            [{
                'from': 'abc',
                'to': ['123@gmail.com'],
                'subject': 'Some subject',
                'text': 123
            }],
        ])('should return 204 only (%s)', async (email: Object) => {
            const response = await request(app).post('/api/v1/email').send(email);
    
            expect(response.status).toBe(204);
            expect(response.text).toBe('');
            expect(saveEmail).toBeCalledTimes(0);
            expect(queueEmail).toBeCalledTimes(0);
        });
    });

    describe('Success', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        afterAll(async () => {
            server.close();
        });
    
        it('should return 204 and then save and queue email', async () => {
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
})
