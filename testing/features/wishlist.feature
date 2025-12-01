Feature: Wishlist Product Selection and Cart Addition
  As a user
  I want to select products from my wishlist and add them to cart
  So that I can purchase my saved items

  Scenario: Add Athletic Jogger and Socks to cart
    When I find the leggings product in wishlist
    And I tap add to cart on the product
    Then I should see the size and color selection modal
    When I select size "M"
    And I select color "Black"
    And I tap the confirm add to cart button
    Then I should see a success notification
    
    When I find the socks product in wishlist
    And I tap add to cart on the product
    Then I should see the size and color selection modal
    When I select size "OS"
    And I select color "White"
    And I tap the confirm add to cart button
    Then I should see a success notification