// Use this file only as a guide for first steps using routes. Delete it when you have added your own route files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/usage/routes

// users hardcore data
const USERS = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
];

const ALL_USERS = [
  ...USERS,
  {
    id: 3,
    name: "Tommy",
  },
  {
    id: 4,
    name: "Timmy",
  },
];


// Call jsonplaceholder service for users-real
async function getUser(userId) {
  const url = userId 
  ? `https://jsonplaceholder.typicode.com/todos/${userId}` 
  : 'https://jsonplaceholder.typicode.com/todos';
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching todo:', error);
    throw error;
  }
}

module.exports = [
  {
    id: "get-users", // route id
    url: "/api/users", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "middleware", // variant handler id , change for use hardcore data -> json
        options: {
          // status: 200, // status to send
          // body: USERS, // body hardcore users to send
          // Express middleware to execute
          middleware: async (req, res) => {       
            try {
              const user = await getUser();
              res.status(200);
              res.send(user);
            } catch (error) {
              console.error('Error getting users:', error);
              res.status(404);
              res.send({
                message: "User not found"
              })
            }
          },
        },
      },
      {
        id: "all", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: ALL_USERS, // body to send
        },
      },
      {
        id: "error", // variant id
        type: "json", // variant handler id
        options: {
          status: 400, // status to send
          // body to send
          body: {
            message: "Error",
          },
        },
      },
    ],
  },
  {
    id: "get-user", // route id
    url: "/api/users/:id", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: USERS[0], // body to send
        },
      },
      {
        id: "id-3", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: ALL_USERS[0], // body to send
        },
      },
      {
        id: "real", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: async (req, res) => {
            const userId = req.params.id;           
            try {
              const user = await getUser(userId);
              res.status(200);
              res.send(user);
            } catch (error) {
              console.error('Error getting users:', error);
              res.status(404);
              res.send({
                message: "User not found"
              })
            }
          },
        },
      },
    ],
  },
];
