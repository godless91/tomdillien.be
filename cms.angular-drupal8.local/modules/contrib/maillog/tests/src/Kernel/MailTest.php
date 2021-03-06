<?php

namespace Drupal\Tests\maillog\Kernel;

use Drupal\KernelTests\KernelTestBase;

/**
 * Tests the maillog plugin.
 *
 * @group maillog
 */
class MailTest extends KernelTestBase {

  /**
   * Modules to enable.
   *
   * @var array
   */
  public static $modules = array('maillog', 'user', 'system', 'views');

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();
    $this->installSchema('maillog', ['maillog']);
    $this->installConfig(['system', 'maillog']);
    // The system.site.mail setting goes into the From header of outgoing mails.
    $this->config('system.site')->set('mail', 'simpletest@example.com')->save();
  }

  /**
   * Tests logging mail with maillog module.
   */
  public function testLogging() {
    // Disables E-Mail Sending, only tracking.
    $this->config('maillog.settings')
     ->set('send', FALSE)
     ->save();

    $language = \Drupal::languageManager()->getCurrentLanguage();

    // Use the maillog mail plugin.
    $GLOBALS['config']['system.mail']['interface']['default'] = 'maillog';

    // Send an email.
    $from_email = 'simpletest@example.com';
    $reply_email = 'someone_else@example.com';
    \Drupal::service('plugin.manager.mail')->mail('simpletest', 'from_test', 'from_test@example.com', $language, array(), $reply_email);

    // Compare the maillog db entry with the sent mail.
    $logged_email = $this->getLatestMaillogEntry();
    $this->assertTrue(is_array($logged_email), 'Email is captured.');
    $this->assertEqual($from_email, $logged_email['header_from'], 'Email is sent correctly.');
    $this->assertEqual($reply_email, $logged_email['header_all']['Reply-to'], 'Message is sent with correct reply address.');
  }

  /**
   * Gets the latest Maillog entry.
   *
   * @return array
   *   Maillog entry
   */
  protected function getLatestMaillogEntry() {
    $query = 'SELECT idmaillog, header_from, header_to, header_reply_to, header_all, subject, body FROM {maillog} ORDER BY idmaillog DESC';
    $result = db_query_range($query, 0, 1);

    if ($maillog = $result->fetchAssoc()) {
      // Unserialize values.
      $maillog['header_all'] = unserialize($maillog['header_all']);
    }
    return $maillog;
  }
}
