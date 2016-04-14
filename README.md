# HeroBoard

A web app displays workout data from a REST endpoint and displays it in a hopefully useful way.

## Tech Used

This app is brought to you by multiple open source libraries and utilities. They are:

AngularJS and multiple angular libraries
Angular Material
jQuery
HTML5 Boilerplate
Google's Open Sans font
The Sass Compiler

It would have been also brought to you by protractor, and cucumberjs, however due to fighting java versioning problems I couldn't get the selenium server to start. Generally I like writing TDD using Gherkin tests. Anyway, on with the show!

## Design Considerations

This application is designed for a large display running at 1920x1080 resolution. The page data will refresh every 10 minutes to give somewhat live results without pounding the REST endpoint.

## Stats

I chose 4 stats which had to be calculated:

1. Total units per test (in this case rounds) performed by the entire team.
2. Average rounds per person in the team (completed or not).
3. Percentage of those which attempted or successfully completed one round as prescribed.
4. Percentage of those which only successfully completed at least one full round.

I felt that each of those stats should be captured and could be graphed to track progress over time.

In addition to that I wanted to show the top and bottom performers as chosen by rank to help highlight those killing it and those who need the motivation to do better.


## Results

Because this was going to be on a TV I chose to display only 8 results at a time, which may take a while to cycle through. Though, instead of showing a page at a time, I decided to scroll through the records so that every record can be displayed for a total of 5 seconds (which seemed to be enough time) but the page is constantly moving so it can cycle through fairly quickly. 

One reason I decided to do the scrolling is to minimize the amount of data one watching the board would have to process to see if there is a person on there that they want to see, instead they can focus just on the bottom of the screen to see who they care about pops up. This was the biggest usability consideration I made for this project.


## Third Party Choices

I went with Angular Material because part of the task was to emulate some look and feel concepts from the TrainHeroic website, which is also using Material. I chose the OpenSans font for that same reason. Also because of the scrolling method that I wanted to use I was able to leverage some of the angular material repeating directives for handling large data sets which was really easy to use. Some of the other libraries were brought in to my project automatically as I used the angular template project built into WebStorm to begin the project.
