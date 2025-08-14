"""
Database router for handling multiple databases in Trimly project.
Routes different models to different databases for demonstration purposes.
"""

class DatabaseRouter:
    """
    A router to control all database operations on models for different databases
    """
    
    route_app_labels = {'api'}
    
    def db_for_read(self, model, **hints):
        """Suggest the database to read from."""
        if model._meta.app_label == 'api':
            # You can route specific models to specific databases
            # For now, use default database
            return 'default'
        return None
    
    def db_for_write(self, model, **hints):
        """Suggest the database to write to."""
        if model._meta.app_label == 'api':
            return 'default'
        return None
    
    def allow_relation(self, obj1, obj2, **hints):
        """Allow relations if models are in the same app."""
        db_set = {'default', 'mysql'}
        if obj1._state.db in db_set and obj2._state.db in db_set:
            return True
        return None
    
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """Ensure that certain apps' models get created on the right database."""
        if app_label == 'api':
            return db == 'default'
        elif db == 'mysql':
            # Don't migrate Django's built-in apps to MySQL
            return app_label == 'api'
        return db == 'default'