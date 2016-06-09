<?php

namespace Drupal\jDrupal\Plugin\rest\resource;

use Drupal\Core\Entity\EntityManagerInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Drupal\Core\Session\AccountProxyInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Psr\Log\LoggerInterface;

/**
 * Provides a resource to get bundles by entity.
 *
 * @RestResource(
 *   id = "jdrupal_connect",
 *   label = @Translation("jDrupal Connect"),
 *   uri_paths = {
 *     "canonical" = "/jdrupal/connect"
 *   }
 * )
 */
class jDrupalConnect extends ResourceBase {
  /**
   *  A current user instance.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected $currentUser;
  /**
   *  A instance of entity manager.
   *
   * @var \Drupal\Core\Entity\EntityManagerInterface
   */
  protected $entityManager;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {

    // @TODO - learn what this does.
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('rest'),
      $container->get('entity.manager'),
      $container->get('current_user')
    );

  }

  /**
   * @TODO - learn what __construct() does.
   */
  /**
   * Constructs a Drupal\rest\Plugin\ResourceBase object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param array $serializer_formats
   *   The available serialization formats.
   * @param \Psr\Log\LoggerInterface $logger
   *   A logger instance.
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    array $serializer_formats,
    LoggerInterface $logger,
    EntityManagerInterface $entity_manager,
    AccountProxyInterface $current_user) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);

    $this->entityManager = $entity_manager;
    $this->currentUser = $current_user;
  }

  /*
   * Responds to GET requests.
   *
   * @return \Drupal\rest\ResourceResponse
   *   The response containing the jDrupal Connect result.
   *
   * @throws \Symfony\Component\HttpKernel\Exception\HttpException
   */
  public function get() {

    // @TODO this should probably be a POST instead

    $account = \Drupal::currentUser();
    $results = array(
      'uid' => $account->id(),
      'name' => $account->getAccountName(),
      'roles' => $account->getRoles()
    );
    \Drupal::moduleHandler()->alter('jdrupal_connect', $results);
    $response = new ResourceResponse($results);
    $response->addCacheableDependency($account);
    return $response;

    throw new HttpException(t('jDrupal Connect GET Failed!'));
  }

}