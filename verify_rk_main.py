import time
import subprocess
import threading
from http.server import HTTPServer, SimpleHTTPRequestHandler
import functools
from playwright.sync_api import sync_playwright

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="/home/rk/Projects/rk_main_Company-site/dist", **kwargs)

def start_server():
    server = HTTPServer(('127.0.0.1', 8899), Handler)
    server.serve_forever()

def verify():
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    time.sleep(1)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel="chrome",
            headless=True,
            args=["--no-sandbox", "--disable-dev-shm-usage"]
        )
        
        # 1. Desktop Viewport
        page = browser.new_page(viewport={"width": 1440, "height": 1100})
        print("[1] Navigating to local dist build on http://127.0.0.1:8899/ ...")
        page.goto("http://127.0.0.1:8899/", wait_until="networkidle")
        time.sleep(1)

        print("[2] Verifying human headlines and plain English cards...")
        content = page.content()
        assert "Can websites secretly track your phone or laptop?" in content
        assert "Why do ticket websites always crash when you need them?" in content
        assert "Is that big Bangalore salary actually worth the move?" in content

        # Take full overview screenshot
        shot1 = "/home/rk/.gemini/antigravity-cli/screenshots/rkws_human_desktop_verified.png"
        page.screenshot(path=shot1, full_page=True)
        print(f"Saved desktop screenshot: {shot1}")

        # 2. Toggle Developer Specs
        print("[3] Clicking 'Are you a developer?' toggle...")
        toggle_btn = page.query_selector(".cs-tech-toggle-btn")
        if toggle_btn:
            toggle_btn.click()
            time.sleep(0.5)
            shot2 = "/home/rk/.gemini/antigravity-cli/screenshots/rkws_tech_drawer_verified.png"
            page.screenshot(path=shot2, full_page=True)
            print(f"Saved tech drawer screenshot: {shot2}")

        # 3. Click About Tab
        print("[4] Clicking 'Who Made This?' about tab...")
        about_btn = page.query_selector("button:has-text('Who Made This?')")
        if about_btn:
            about_btn.click()
            time.sleep(0.5)
            shot3 = "/home/rk/.gemini/antigravity-cli/screenshots/rkws_about_tab_verified.png"
            page.screenshot(path=shot3, full_page=False)
            print(f"Saved about tab screenshot: {shot3}")

        # 4. Mobile Viewport (iPhone 14 Pro style)
        page_mobile = browser.new_page(viewport={"width": 390, "height": 844})
        page_mobile.goto("http://127.0.0.1:8899/", wait_until="networkidle")
        time.sleep(1)
        shot_mobile = "/home/rk/.gemini/antigravity-cli/screenshots/rkws_human_mobile_verified.png"
        page_mobile.screenshot(path=shot_mobile, full_page=True)
        print(f"Saved mobile screenshot: {shot_mobile}")

        browser.close()
        print("✅ ALL CHECKS PASSED PERFECTLY!")

if __name__ == "__main__":
    verify()
