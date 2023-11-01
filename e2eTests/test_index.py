import re
from playwright.sync_api import Page, expect


def test_has_title(page: Page):
    page.goto("http://localhost:8000/")

    # Expect a title "to contain" a substring.
    expect(page).to_have_title(re.compile("React App"))


def test_has_correct_heading(page: Page):
    page.goto("http://localhost:8000/")
    expect(page.get_by_role("heading", name="Mentoring App")).to_be_visible()
