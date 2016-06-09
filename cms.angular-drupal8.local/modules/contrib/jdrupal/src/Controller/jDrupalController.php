<?php

/**
 * @file
 * Contains \Drupal\jDrupal\Controller\jDrupalController.
 */

namespace Drupal\jDrupal\Controller;

use Drupal\Core\Controller\ControllerBase;
use GuzzleHttp\Psr7\Response;
use Drupal\Core\Url;
use Drupal\Core\Link;


/**
 * Returns responses for jDrupal module routes.
 */
class jDrupalController extends ControllerBase {

  /**
   * Return the jDrupal configuration page.
   *
   * @return string
   *   A render array containing our jDrupal configuration page content.
   */
  public function jDrupalConfig() {
    $output = array();
    $output['links'] = array(
      '#theme' => 'item_list',
      '#items' => array(
        Link::fromTextAndUrl(
          t('Configure Drupal 8 REST'),
          Url::fromRoute('restui.list')
        ),
        Link::fromTextAndUrl(
          t('Getting Started with jDrupal'),
          Url::fromUri('http://jdrupal.easystreet3.com')
        )
      )
    );
    return $output;
  }

}
