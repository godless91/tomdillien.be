<?php

/**
 * @file
 * Contains \Drupal\contact_form\Controller\ContactFormController.
 */

namespace Drupal\contact_form\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Returns responses for contact_form module routes.
 */
class ContactFormController extends ControllerBase {

  /**
   * Return response of contact form processing.
   *
   * @return json.
   */
  public function process(Request $request) {

    $name = $request->get('inputName');
    $email = $request->get('inputEmail');
    $subject = $request->get('inputSubject');
    $message = $request->get('inputMessage');
      
    $to = 'tom@pau.be';
    $website = 'www.tomdillien.be';
    $from = $email;
    $base_root = $_SERVER['HTTP_HOST'];
    $params = [
      'name' => $name,
      'from' => $from,
      'message' => $message,
      'subject' => $subject,
      'base_root' => $base_root,
    ];
    
    $mailManager = \Drupal::service('plugin.manager.mail');
 
    $module = 'contact_form';
    $key = 'contact_form_mail';
    $langcode = \Drupal::languageManager()->getDefaultLanguage();
    $send = true;
  
    $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);
  
    if ($result['result'] !== true) {
      $response['success'] = false;
    $response['message'] = 'Email could not be sent.';
    }
    $response['success'] = true;
    $response['message'] = 'Email has been sent';
    
    return new JsonResponse($response);

  }

}
