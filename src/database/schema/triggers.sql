USE usof;

set GLOBAL log_bin_trust_function_creators = 1;

CREATE TRIGGER default_top_id BEFORE INSERT ON comments FOR EACH ROW
    IF NEW.top_id IS NULL THEN
        SET NEW.top_id := NEW.comment_id;
    END IF;;
