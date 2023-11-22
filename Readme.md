# Developer Guide


### Dependency Tree

shared
domain

application depends on shared and domain

managers depends on application and others

ui core depend off top all mentioned libs

vue app depends on all top applications


so build order should be shared -> domain -> application -> managers -> ui core -> vue app