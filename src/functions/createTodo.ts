import { v4 as uuidv4 } from 'uuid';
import { document } from "./utils/dynamodbClient";

interface ICreateTodo {
    title: string,
    deadline: string
}

export const handle = async (event) => {
    const { user_id } = event.pathParameters;

    const {
        title,
        deadline,
    } = JSON.parse(event.body) as ICreateTodo;

    const todo = {
        id: uuidv4(),
        user_id,
        title,
        done: false,
        deadline: new Date(deadline),
    };

    await document.put({
        Item: todo,
        TableName: 'todos'
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Created new todo",
            todo
        }),
        headers:{
            "Content-type": "application/json"
        }
    }
}
