export const valid = {
    testKey: 'JIRA-123',
    username: 'standard_user',
    password: 'secret_sauce'
};

export const home_url = 'https://www.saucedemo.com/inventory.html';

export const invalid = [
    {
        testKey: 'JIRA-124',
        testcase: 'invalid username',
        username: 'username_invalid',
        password: 'secret_sauce'
    },
    {
        testKey: 'JIRA-125',
        testcase: 'invalid password',
        username: 'standard_user',
        password: 'password_invalid'
    },
    {
        testKey: 'JIRA-126',
        testcase: 'invalid username and password',
        username: 'username_invalid',
        password: 'password_salah'
    }
];