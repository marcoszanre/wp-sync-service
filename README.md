# Workplace People Sync Service
**This sample is provided as is.**

This repository contains an example of a custom Workplace people sync service, developed in Node, that can be configured to, upon a trigger, sync users from a local `.csv` file into a Workplace people directory, using the SCIM 2.0 API and a custom Integration.

![Console Log Example](https://github.com/marcoszanre/wp-sync-service/blob/main/ConsoleScreenshot.png)

## How to test this sample?

1. [Create a new Integration](https://developers.facebook.com/docs/workplace/custom-integrations-new/) in your Workplace instance
2. Assign it the `Manage accounts` permission
3. Under Details, create and take note of the access token
4. Clone the repo
5. `npm install` the packages
6. Create a `.env` file and add an entry with the name `SYNC_SERVICE_API_KEY` with the Integration access token
7. Configure your `.csv` file with the relevant users - only the fields `email`, `name` and `active` are available under this sample. In addition, make sure that the users' domain(s) have already being [verified in Workplace]((https://www.workplace.com/resources/tech/it-configuration/domain-verification)).
8. Run `node server.js` from the terminal and review sync updates.

## Where to go from here?

Following are some of the suggestions that could be applied to this sample:

- Configure additional logic to check for attributes changes, other than `email`, `name` and `active`
- Create a CRON job to execute this script based on a schedule
- Configure security settings to host the access token in a key vault
- Configure notification settings to send a [Workplace bot](https://developers.facebook.com/docs/workplace/bots/) Work Chat message or post to a group with a job summary
- Configure additional supported entries to facilitate the process of importing users's data, and assess creating a configuration wizard to save sync preferences 
- Configure error checks to guarantee the quality of the `.csv` file
- Configure an approval step, based on a Workplace bot, to review and approve changes before executing them - even if just for the deactivation process. 

## References

You can read more about the above topics in the following links:
- [Account Management SCIM 2.0 API](https://developers.facebook.com/docs/workplace/reference/account-management-api/scim-v2)
- [Workplace Custom Integrations](https://developers.facebook.com/docs/workplace/custom-integrations-new/)
- [Workplace Integration Permissions](https://developers.facebook.com/docs/workplace/reference/permissions)
- [Workplace Domain Verification](https://www.workplace.com/resources/tech/it-configuration/domain-verification)
- [Bots for Workplace](https://developers.facebook.com/docs/workplace/bots/)
- [Custom Integrations](https://developers.facebook.com/docs/workplace/custom-integrations-new/)
