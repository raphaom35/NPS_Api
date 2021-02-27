import request from 'supertest'
import {app} from '../app'
import createConnection from '../database'

describe("Survey", async () =>{
    beforeAll( async () =>{
        const connection = await createConnection();
        await connection.runMigrations();
    })
    it("should be able to create a new survey",async () =>{
        const response = await request(app).post("/surveys")
        .send({
            title:"Titlie Examples",
            description:"Examples"
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    }); 
    it("should be able to get all surveys",async () =>{
        await request(app).post("/surveys")
        .send({
            title:"Titlie Examples",
            description:"Examples"
        });
        const response = await request(app).get("/surveys");
        expect(response.body.length).toBe(2);

    })  
})