<?php

/**
 * @file
 * Contains \Drupal\navigation_json\Controller\NavigationJsonController.
 */

namespace Drupal\navigation_json\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Menu\MenuLinkTree;
use Drupal\Core\Menu\MenuTreeParameters;
use Symfony\Component\HttpFoundation\JsonResponse;
/**
 * Returns responses for navigation_json module routes.
 */
class NavigationJsonController extends ControllerBase {

  /**
   * Return the main menu as json.
   *
   * @return json.
   */
  public function export() {

    // Load main menu.
    $menu_tree = \Drupal::menuTree();
    $menu_name = 'main';
    $parameters = new MenuTreeParameters();
    $mainMenu = $menu_tree->load($menu_name, $parameters);
    $arrMenu = array();
    foreach ($mainMenu as $item ){
      if ($item->link->getPluginDefinition()['enabled']) {
        // Sort by weight.
        $arrMenuItem = [
          'title' => $item->link->getPluginDefinition()['title'],
          'route' => $item->link->getPluginDefinition()['options']['fragment']
        ];
        $index = $item->link->getPluginDefinition()['weight'];
        $arrMenu[$index] = $arrMenuItem;
      }
    }
    // Sort negative weight numbers.
    ksort($arrMenu);
    array_reverse($arrMenu);

    return new JsonResponse($arrMenu);
  }

}
