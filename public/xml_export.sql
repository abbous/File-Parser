/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: xml_table
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `xml_table` (
  `food_name` varchar(255) DEFAULT NULL,
  `food_price` varchar(255) DEFAULT NULL,
  `food_description` varchar(255) DEFAULT NULL,
  `food_calories` varchar(255) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: xml_table
# ------------------------------------------------------------

INSERT INTO
  `xml_table` (
    `food_name`,
    `food_price`,
    `food_description`,
    `food_calories`
  )
VALUES
  (
    'Belgian Waffles',
    '$5.95',
    'Two of our famous Belgian Waffles with plenty of real maple syrup',
    '650'
  );
INSERT INTO
  `xml_table` (
    `food_name`,
    `food_price`,
    `food_description`,
    `food_calories`
  )
VALUES
  (
    'Strawberry Belgian Waffles',
    '$7.95',
    'Light Belgian waffles covered with strawberries and whipped cream',
    '900'
  );
INSERT INTO
  `xml_table` (
    `food_name`,
    `food_price`,
    `food_description`,
    `food_calories`
  )
VALUES
  (
    'Berry-Berry Belgian Waffles',
    '$8.95',
    'Light Belgian waffles covered with an assortment of fresh berries and whipped cream',
    '900'
  );
INSERT INTO
  `xml_table` (
    `food_name`,
    `food_price`,
    `food_description`,
    `food_calories`
  )
VALUES
  (
    'French Toast',
    '$4.50',
    'Thick slices made from our homemade sourdough bread',
    '600'
  );
INSERT INTO
  `xml_table` (
    `food_name`,
    `food_price`,
    `food_description`,
    `food_calories`
  )
VALUES
  (
    'Homestyle Breakfast',
    '$6.95',
    'Two eggs, bacon or sausage, toast, and our ever-popular hash browns',
    '950'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
