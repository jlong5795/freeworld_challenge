# General Requirements

Given a list of students with revenue potentials and hours of instruction needed, as well as the max instruction hours per cohort, find the maximum earnings you can generate from the student cohort where the sum of the instruction hours are less than or equal to the max instruction hours.

## Solution Plan

1. Recreate example data to be used as default state
2. Create view for sample data that also supports being able to update that information
3. Implement function to evaluate return by student
4. Create a new array of accepted students based on criteria
5. Display currently accepted students and total potential

## Project Recap

I thought about this project in two main parts: the user's interface with the data and the calculation that was required to provide the requested information. The UI part was mostly straightforward. It involved taking a sample data set, first displaying it in a meaningful way, then thinking what the most user intuitive method of modification would be. I settled on an inline form that doesn't take the user out of context.

The calculations were trickier. I thought about what the requested data represented. It represents the best return on time investment. That equates to potential earnings per instruction hour. Once I decided that was the important metric, I calculated that per student, then created a solutions array that took the best return student, looked to see if we could fit the next best return and iterated through that process. There exists a potential that the next student requires too many hours, but the one following does not, so the function skips the "ineligible" student and evaluates the next.

## Time Logging

According to WakaTime I spent 5 hours 43 minutes on this project. That is partially due to my want to make the form/static display better for mobile users, but also because I spent some time over the weekend going back and forth between things. I'm not sure exactly how it calculates "active time" but I'm certain it's not pure keystrokes, so that time is at least slightly overstated.

## Deployed Project

This project is deployed using Netlify here: https://eloquent-kepler-200b55.netlify.app/
