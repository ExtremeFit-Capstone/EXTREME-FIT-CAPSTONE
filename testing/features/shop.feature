Feature: Shopping Actions
  As a user
  I want to browse products
  And add one to my wishlist

  Scenario: Select a product and add it to the wishlist
    Given the product list is displayed
    When I select the product named "Hoodie"
    Then I should see the product details screen for "Hoodie"

    When I tap the heart icon
    Then the item should be added to my wishlist

    When navigate back
