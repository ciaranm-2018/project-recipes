import os
import unittest
from app import app

class AppTestCase(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()
   
    def test_root_api(self):
        rv = self.app.get('/')
        assert b'Hello, World!' in rv.data

    def test_get_recipe_api(self):
        rv = self.app.get('/api/recepies')
        self.assertEqual(rv.status_code, 200)
    

if __name__ == '__main__':
    unittest.main()