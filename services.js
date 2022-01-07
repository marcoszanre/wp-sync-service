// Initial Config
const axios = require('axios').default;
const colors = require('./colors');
const apiKey = process.env.SYNC_SERVICE_API_KEY;
const config = {
    headers: { Authorization: `Bearer ${apiKey}` }
};
const scimEndpoint = "https://scim.workplace.com/Users";

// Init services
const initServices = () => {
    if (apiKey) {
        return true;
    }
    else {
        return false;
    }
}

// Sync user upon checking if available
const syncUser = async (user) => {
    console.log(colors.yellow,`Initiating sync for ${user.name}`);
    const res = await axios.get(
        `${scimEndpoint}?filter=userName eq "${user.email}"`,
        config
    );
    if (res.data.totalResults == 1) {
        // User was found
        console.log(colors.yellow,`User ${user.name} found. Initiating attribute comparison...`);
        compareUser(user, res.data.Resources[0]);
    }
    else if (res.data.totalResults == 0)
    {
        // User does not exist yet
        console.log(colors.yellow,`User ${user.name} not found. Initiating user creation...`);
        createUser(user);
    }
    else {
        console.log(colors.red,"An error has ocurred");
    }
}

// Create a new user
const createUser = async (user) => {
    const userBody = {
        "schemas": [
            "urn:ietf:params:scim:schemas:core:2.0:User"
        ],
        "userName": `${user.email}`,
        "active": `${user.active}`,
        "name": {
            "formatted": `${user.name}`
        }
    }
    const res = await axios.post(
        scimEndpoint,
        userBody,
        config
    );
    if (res.status == 201) {
        // User was created successfully
        console.log(colors.green,`User ${user.name} was created successfully.`)
    }
    else {
        console.log(colors.red,`An error happened to create the user ${user.name} with status ${res.status}.`)
    }
}

// Compare local to cloud user attributes
const compareUser = (localUser, cloudUser) => {
    // Compare name
    if (localUser.name != cloudUser.name.formatted) {
        console.log(colors.yellow,`User ${localUser.name} has a different name. Updating user name from ${cloudUser.name.formatted} to ${localUser.name}...`);
        updateUserName(localUser, cloudUser.id);
    }
    // Compare status
    if (localUser.active !== cloudUser.active.toString()) {
        console.log(colors.yellow,`User ${localUser.name} has a different status. Updating user status from ${cloudUser.active} to ${localUser.active}...`);
        updateUserStatus(localUser, cloudUser.id, localUser.active);
    }
}

// Update cloud user Name
const updateUserName = async (user, userId) => {
    const userBody = {
        "schemas": [
            "urn:ietf:params:scim:schemas:core:2.0:User"
        ],
        "name": {
            "formatted": `${user.name}`
        }
    }
    const res = await axios.put(
        `${scimEndpoint}/${userId}`,
        userBody,
        config
    );
    if (res.status == 200) {
        // User was updated successfully
        console.log(colors.green,`User ${user.name} was updated successfully.`)
    }
    else {
        console.log(colors.red,`An error happened to update the user ${user.name} with the status ${res.status}.`)
    }
}

//  Update user status
const updateUserStatus = async (user, userId, status) => {
    const userBody = {
        "schemas": [
            "urn:ietf:params:scim:schemas:core:2.0:User"
        ],
        "active": status
    }
    const res = await axios.put(
        `${scimEndpoint}/${userId}`,
        userBody,
        config
    );
    if (res.status == 200) {
        // User status was updated successfully
        console.log(colors.green,`User ${user.name} was updated with status ${status} successfully.`)
    }
    else {
        console.log(colors.red,`An error happened to deactivate the user ${user.name} with the status ${res.status}.`)
    }
}

// Export
module.exports = {
    initServices,
    syncUser
};
