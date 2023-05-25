require "test_helper"

class MapperControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get mapper_index_url
    assert_response :success
  end
end
