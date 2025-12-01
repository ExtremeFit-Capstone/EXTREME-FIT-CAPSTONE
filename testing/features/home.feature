Feature: Home Screen Unisex Selection

  Scenario: User can add joggers and socks to wishlist
    When I select the unisex gender option
    Then I should see the unisex categories
    And I should see category options
    
    # Add Joggers to wishlist
    When I select the "Joggers" category
    Then I should see the "Joggers" products screen
    When I select the first product
    Then I should see the product details screen
    When I tap the wishlist heart icon
    Then the product should be added to my wishlist
    
    # Go back to categories
    When I navigate back
    And I navigate back
    
    # Add Socks to wishlist
    When I select the "Socks" category
    Then I should see the "Socks" products screen
    When I select the first product
    Then I should see the product details screen
    When I tap the wishlist heart icon
    Then the product should be added to my wishlist
    
    # Go back to home
    When I navigate back
    And I navigate back
