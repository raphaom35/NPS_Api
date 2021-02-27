import request from 'supertest'
import {app} from '../app'
import createConnection from '../database'

describe("Users", async () =>{
    beforeAll( async () =>{
        const connection = await createConnection();
        await connection.runMigrations();
    })
    it("should be able to create a new user",async () =>{
        const response = await request(app).post("/users")
        .send({
            email:"user@explem.com",
            name:"user"
        });
        expect(response.status).toBe(201);
    });
    it("should not bo able to create a user with exists email", async()=>{
        const response = await request(app).post("/users")
        .send({
            email:"user@explem.com",
            name:"user"
        });
        expect(response.status).toBe(400);
    })
   
})