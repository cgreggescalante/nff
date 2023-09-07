"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutType = void 0;
var fs = require("fs");
// eslint-disable-next-line @nx/enforce-module-boundaries
var faker_1 = require("@faker-js/faker");
var WorkoutType;
(function (WorkoutType) {
    WorkoutType["Run"] = "Run";
    WorkoutType["Bike"] = "Bike";
    WorkoutType["Swim"] = "Swim";
    WorkoutType["Ski"] = "Ski";
})(WorkoutType || (exports.WorkoutType = WorkoutType = {}));
var generateDynamicJSONData = function () {
    var users = Array.from({ length: 10 })
        .map(function (_, index) { return ({
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        id: index
    }); });
    var uploads = users.map(function (user) {
        return Array.from({ length: 10 }).map(function (_, ui) { return ({
            user: user,
            id: user.id * 10 + ui,
            date: faker_1.faker.date.past({ years: 1 }),
            workouts: Array.from({ length: 2 }).map(function (_, wi) { return ({
                workoutType: faker_1.faker.helpers.enumValue(WorkoutType),
                duration: faker_1.faker.number.int({ min: 1, max: 100 }),
                points: faker_1.faker.number.int({ min: 1, max: 20 }),
                uploadId: user.id * 10 + ui,
                userId: user.id
            }); }),
            points: faker_1.faker.number.int({ min: 2, max: 40 })
        }); });
    }).flat();
    var workouts = uploads.map(function (upload) { return upload.workouts; }).flat();
    return JSON.stringify({ users: users, uploads: uploads, workouts: workouts }, null, 2); // Pretty-print the JSON data
};
fs.writeFile('dynamicTestData.json', generateDynamicJSONData(), function (err) {
    if (err) {
        console.error('An error occurred:', err);
    }
    else {
        console.log('JSON data has been written to dynamicTestData.json');
    }
});
