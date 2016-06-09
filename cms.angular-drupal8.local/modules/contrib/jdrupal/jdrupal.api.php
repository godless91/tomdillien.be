<?php

/**
 * Alter the result of the jDrupal Connect resource.
 * @param $results
 */
function hook_jdrupal_connect_alter($results) {

  // Add some custom data to the result.
  $results['my_module'] = array(
    'hello' => 'world',
    'foo' => array('bar', 'chew')
  );

}