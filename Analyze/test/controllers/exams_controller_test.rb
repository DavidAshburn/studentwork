require "test_helper"

class ExamsControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get exams_home_url
    assert_response :success
  end
end
