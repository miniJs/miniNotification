describe 'miniNotification', ->
  options =
    position: 'top'

  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $('#fixtures')

  it 'should be available on the jQuery object', ->
    expect($.fn.miniNotification).toBeDefined()

  it 'should be chainable', ->
    expect(@$element.miniNotification(options)).toBe(@$element)

  it 'should offers default values', ->
    plugin = new $.miniNotification(@$element[0], options)

    expect(plugin.defaults).toBeDefined()

  it 'should overwrites the settings', ->
    plugin = new $.miniNotification(@$element[0], options)
    expect(plugin.settings.position).toBe(options.position)