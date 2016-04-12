# A dashboard describing the good the bad and the ugly of training data.

Feature: The page loads properly.
  As someone coming to this site
  I should be able to see that the page loads

  Scenario: The page loads with the correct title
    Given I go to "index.html"
    Then the title should equal "HeroBoard"

