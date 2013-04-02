meteor-pub-fields-test
======================

Repro app for field specifier not working on sub-fields

Clicking on one of the items in the list should select it to have more data brought down from the server about it: the `profile.specific` field.  This is to emulate the `Meteor.users` collection, where there are often a lot of different fields in the `user.profile` field and it would be very useful to be able to only send down certain sub-fields to the client.

The problem seems to be that the Meteor server thinks that because it's already published a sub-field of a field (such as `profile.general`), then it's published the whole field, and therefore doesn't listen to subsequent publish functions that try to expose the other sub-fields (such as `profile.specific`) or the entire top-level field (`profile`).
